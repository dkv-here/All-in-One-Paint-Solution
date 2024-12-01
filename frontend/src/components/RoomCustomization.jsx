import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Wall = ({ position, rotation, color }) => {
  return (
    <mesh position={position} rotation={rotation} receiveShadow castShadow>
      <planeGeometry args={[4, 3]} />
      <meshStandardMaterial color={color} side={THREE.FrontSide} roughness={0.4} metalness={0} />
    </mesh>
  );
};

const Sofa = ({ position, color }) => {
  return (
    <mesh position={position} receiveShadow castShadow>
      {/* Sofa base */}
      <boxGeometry args={[0.8, 0.3, 0.58]} />
      <meshStandardMaterial color={color} />

      {/* Sofa backrest */}
      <mesh position={[0, 0.42, -0.375]}>
        <boxGeometry args={[0.8, 0.5, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Sofa arms */}
      <mesh position={[-0.4, 0.1, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.4, 0.1, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </mesh>
  );
};

const Window = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Window Glass */}
      <mesh>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color={"#5cd1ff"} // Light blue glass
          opacity={0.9} // Semi-transparent glass
          transparent
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Window Frame */}
      <mesh>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.5, 2)]} />
        <lineBasicMaterial color={"#ffffff"} />
      </mesh>

      {/* Horizontal Divider */}
      <mesh position={[0, -0.6, 0.01]}>
        <planeGeometry args={[1.5, 0.05]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.5, 0.05]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
      <mesh position={[0, 0.6, 0.01]}>
        <planeGeometry args={[1.5, 0.05]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>

      {/* Vertical Divider */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.05, 2]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
    </group>
  );
};

const CameraController = ({ angle }) => {
  useFrame(({ camera }) => {
    camera.position.set(0, 1.5, 0);
    camera.lookAt(
      5 * Math.sin(angle), // X-coordinate based on rotation angle
      1.5, // Y-coordinate (fixed height)
      5 * Math.cos(angle) // Z-coordinate based on rotation angle
    );
  });
  return null;
};

const LightController = ({ angle, pointLightRef }) => {
  useFrame(() => {
    const xPos = 5 * Math.sin(angle);
    const zPos = 5 * Math.cos(angle);

    if (pointLightRef.current) {
      pointLightRef.current.position.set(xPos, 5, zPos); // Move point light
      pointLightRef.current.intensity = 2.5; // Increase light intensity
    }
  });

  return null;
};

const RoomCustomization = () => {
  const [wallColors, setWallColors] = useState({
    wall1: "#ffffff",
    wall2: "#ffffff",
    wall3: "#eeeeee",
    wall4: "#eeeeee",
    floor: "#666666",
    ceiling: "#fff7d4",
  });

  const [sofaColor, setSofaColor] = useState("#3f3f3f"); // Default sofa color
  const [rotationAngle, setRotationAngle] = useState(0);

  const pointLightRef = useRef();

  const handleColorChange = (surface, color) => {
    setWallColors((prev) => ({ ...prev, [surface]: color }));
  };

  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setLastMouseX(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const movementX = event.clientX - lastMouseX;
    setRotationAngle((prevAngle) => prevAngle + movementX * 0.01); // Slightly increased sensitivity
    setLastMouseX(event.clientX);
  };

  const saveDesign = async () => {
    try {
      const response = await fetch("/api/customDesigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ wallColors, sofaColor }), // Include sofa color
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Design saved:", data);
        toast.success(<strong>Your design saved successfully !</strong>);
        fetchDesigns();
      } else if (response.status === 500) {
        toast.error(<strong>You must login to save a design !!!</strong>);
        setTimeout(() => {
          window.location.href = "/login";
        }, 3500);
      } else {
        console.error("Failed to save design:", data.message);
      }
    } catch (error) {
      console.error("Error saving design:", error);
    }
  };
  
  
  
  const [designs, setDesigns] = useState([]);

  const fetchDesigns = async () => {
    try {
      const response = await fetch("/api/customDesigns", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        setDesigns(data); // Set the fetched designs to state
      } else {
        console.error("Failed to fetch designs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching designs:", error);
    }
  };
  

  useEffect(() => {
    fetchDesigns();
  }, []);

  const deleteDesign = async (id) => {
    try {
      const response = await fetch(`/api/customDesigns/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Design removed", data)
        toast.success(<strong>Design removed !!</strong>)
        fetchDesigns(); // Refresh designs
      } else {
          console.error("Failed to delete design:", data.message);
      }
    } catch (error) {
        console.error("Error deleting design:", error);
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", gap: "20px" }} className="ml-60">
      <div
        style={{ width: "75%", height: "580px", border: "6px solid #343434" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Canvas shadows camera={{ position: [0, 1.5, 0], fov: 75 }}>
          {/* Lighting */}
          <ambientLight intensity={2} />
          <directionalLight position={[5, 0, 5]} intensity={2} castShadow />
          <pointLight
            ref={pointLightRef}
            position={[5, 5, 5]}
            intensity={2}
            color={"#ffffff"}
            castShadow
          />

          {/* Camera Controller */}
          <CameraController angle={rotationAngle} />

          {/* Light Controller */}
          <LightController angle={rotationAngle} pointLightRef={pointLightRef} />

          {/* Walls */}
          <Wall position={[0, 1.5, -2]} rotation={[0, 0, 0]} color={wallColors.wall1} />
          <Wall position={[0, 1.5, 2]} rotation={[0, Math.PI, 0]} color={wallColors.wall2} />
          <Wall position={[-2, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} color={wallColors.wall3} />
          <Wall position={[2, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} color={wallColors.wall4} />

          {/* Floor */}
          <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color={wallColors.floor} />
          </mesh>

          {/* Ceiling */}
          <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color={wallColors.ceiling} />
          </mesh>

          {/* Sofa */}
          <Sofa position={[0, 0.8, -1.25]} rotation={[-90, 0, 0]} color={sofaColor} />

          {/* Window */}
          <Window position={[0.5, 1.5, 2]} rotation={[0, Math.PI, 0]} />
        </Canvas>
      </div>

      {/* Controls */}
      <div style={{ flex: 1 }} className="flex flex-col gap-2 font-semibold bg-gradient-to-r from-gray-400 to-gray-200 mr-20 p-6 rounded-md">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={wallColors.wall1}
            onChange={(e) => handleColorChange("wall1", e.target.value)}
            className="w-6 h-10"  
          />
          <h2>Wall 1 Color</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={wallColors.wall2}
            onChange={(e) => handleColorChange("wall2", e.target.value)}
            className="w-6 h-10"
          />
          <h2>Wall 2 Color</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={wallColors.wall3}
            onChange={(e) => handleColorChange("wall3", e.target.value)}
            className="w-6 h-10"
          />
          <h2>Wall 3 Color</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={wallColors.wall4}
            onChange={(e) => handleColorChange("wall4", e.target.value)}
            className="w-6 h-10"
          />
          <h2>Wall 4 Color</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={wallColors.floor}
            onChange={(e) => handleColorChange("floor", e.target.value)}
            className="w-6 h-10"
          />
          <h2>Floor Color</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={wallColors.ceiling}
            onChange={(e) => handleColorChange("ceiling", e.target.value)}
            className="w-6 h-10"
          />
          <h2>Ceiling Color</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={sofaColor}
            onChange={(e) => setSofaColor(e.target.value)}
            className="w-6 h-10"
          />
          <h2>Sofa Color</h2>
        </div>
        <div>
          <button onClick={saveDesign} className="text-white px-2 py-1 rounded-md bg-gradient-to-r from-purple-900 to-pink-700 mt-5">Save Design</button>
        </div>

      </div>
    </div>

      {/* Display Saved Designs */}
      <div className="w-full mt-6 p-4 border-t-4 border-gray-300 pb-[4rem] pt-[2rem]"
        style={{ backgroundImage: 'url()' }}>
        
        <div className="pl-20">
          <h2 className="text-lg font-bold mb-4">Saved Designs</h2>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {designs.length > 0 ? (
            designs.map((design, index) => (
              <div
                key={index}
                className="flex border rounded-lg shadow-md shadow-[rgba(0,0,0,0.3)] cursor-pointer hover:shadow-[rgba(79,0,105,0.65)] hover:shadow-lg"
                onClick={() => {
                  setWallColors(design.wallColors); 
                  setSofaColor(design.sofaColor);
                }}
              >
                {/* Left part: Color details */}
                <div className="bg-[rgba(255,255,255,0.85)] w-3/4 px-4 pt-3 pb-3 rounded-lg ">
                  <div>
                  <h3 className="text-lg font-bold mb-2">Design {index + 1}</h3>
                  <p className="text-md"><span className="mr-2 w-4 h-4 rounded-full border border-black" style={{ backgroundColor: design.wallColors.wall1, display: 'inline-block', }}></span><span className="font-semibold">Wall 1:</span> {design.wallColors.wall1} </p>
                  <p className="text-md"><span className="mr-2 w-4 h-4 rounded-full border border-black" style={{ backgroundColor: design.wallColors.wall2, display: 'inline-block', }}></span><span className="font-semibold">Wall 2:</span> {design.wallColors.wall2} </p>
                  <p className="text-md"><span className="mr-2 w-4 h-4 rounded-full border border-black" style={{ backgroundColor: design.wallColors.wall3, display: 'inline-block', }}></span><span className="font-semibold">Wall 3:</span> {design.wallColors.wall3} </p>
                  <p className="text-md"><span className="mr-2 w-4 h-4 rounded-full border border-black" style={{ backgroundColor: design.wallColors.wall4, display: 'inline-block', }}></span><span className="font-semibold">Wall 4:</span> {design.wallColors.wall4} </p>
                  <p className="text-md"><span className="mr-2 w-4 h-4 rounded-full border border-black" style={{ backgroundColor: design.wallColors.floor, display: 'inline-block', }}></span><span className="font-semibold">Floor:</span> {design.wallColors.floor} </p>
                  <p className="text-md"><span className="mr-2 w-4 h-4 rounded-full border border-black" style={{ backgroundColor: design.wallColors.ceiling, display: 'inline-block', }}></span><span className="font-semibold">Ceiling:</span> {design.wallColors.ceiling} </p>
                  <p className="text-md"><span className="mr-2 w-4 h-4 rounded-full border border-black" style={{ backgroundColor: design.sofaColor, display: 'inline-block', }}></span><span className="font-semibold">Sofa:</span> {design.sofaColor}</p>
                  </div>

                  <div className="mt-3">
                    <button onClick={() => deleteDesign(design._id)} className="flex items-center space-x-2 text-white text-xs font-semibold bg-gradient-to-r from-red-600 to-orange-500 px-4 p-1 rounded-md">
                      <FaTrash /><span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Right part: Gradient */}
                <div
                  className="w-1/4 rounded-r-lg"
                  style={{
                    background: `linear-gradient(to bottom, ${design.wallColors.wall1}, ${design.wallColors.wall2}, ${design.wallColors.wall3}, ${design.wallColors.wall4})`,
                  }}
                >
                </div>
              </div>
            ))
          ) : (
            <p>No designs saved yet!</p>
          )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCustomization;

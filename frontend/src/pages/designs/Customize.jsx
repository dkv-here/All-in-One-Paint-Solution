import RoomCustomization from '../../components/RoomCustomization'

const Customize = () => {
  return (
    <div
      className="bg-cover bg-center" 
      style={{ backgroundImage: 'url(/DKV/BCA/min_proj/uploads/image-1731428238239.jpg)' }} 
    >
      <h1 className="ml-[15.5rem] mt-[0.5rem] mb-[1rem] text-[1.8rem] text-black">
        DESIGN YOUR ROOM
      </h1>
      <RoomCustomization />
    </div>
  )
}

export default Customize

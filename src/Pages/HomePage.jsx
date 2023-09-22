import React, { useEffect, useState } from "react";
import { Pictures } from "../data";
import { BallTriangle } from "react-loader-spinner";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

const MovePictures = ({
  picture,
  handleMove,
  dragOverPicture,
  dragPicture,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: picture.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className="border-[2px] bg-veryLightgrey mb-4 p-4"
      ref={setNodeRef}
      {...attributes}
      style={style}
      {...listeners}
    >
      <img
        src={picture.img}
        alt={picture.tags[0]}
        height={"250px"}
        className="rounded-b-md w-[200px] h-[250px]"
      />
      <div className="flex justify-evenly mt-4">
        <h3 className="font-bold font-DMSans text-sm border-[1px] border-veryLightgrey rounded-md px-4 bg-darkRed text-white">
          {picture.tags[0]}
        </h3>
        <h3 className="font-bold font-DMSans text-sm border-[1px] border-veryLightgrey rounded-md px-4 bg-darkRed text-white">
          {picture.tags[1]}
        </h3>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState(Pictures);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState("");

  const mouse = useSensor(MouseSensor),
    touch = useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    });
  const sensors = useSensors(mouse, touch);

  useEffect(() => {
    setTimeout(() => {
      const existingUser = JSON.parse(localStorage.getItem("user"));
      setUser(existingUser);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="spinner">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#000"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  const search = () => {
    const searchArray = Pictures.filter((picture) =>
      picture.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setPictures(searchArray);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setPictures((pictures) => {
      const oldIndex = pictures.findIndex((image) => image.id === active.id);
      const newIndex = pictures.findIndex((image) => image.id === over.id);
      return arrayMove(pictures, oldIndex, newIndex);
    });
  };

  return (
    <>
      <div className="flex justify-center mx-[7.5%] items-center mt-4">
        <h1 className="text-2xl font-bold font-DMSans md:text-4xl mb-4">
          {users
            ? `Hi ${
                users ? users.providerData[0].email : "NA"
              } Welcome to Banwo's Picture Gallery`
            : ""}
        </h1>
      </div>
      <div className="mx-[7.5%] flex flex-col md:flex-row justify-center items-center mb-2">
        <input
          type="text"
          placeholder="Search by tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-1 border-[2px] border-veryLightgrey mb-2 md:mb-0 rounded-md w-[250px] md:w-[400px]"
        />
        <button
          className="py-1 px-2  rounded-md bg-darkRed text-white w-[250px] md:w-[150px] md:ml-3"
          onClick={search}
        >
          Search
        </button>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={pictures} strategy={rectSortingStrategy}>
          <div className="my-[30px] flex flex-wrap justify-evenly mx-[7.5%] pb-4">
            {pictures.map((picture, index) => (
              <MovePictures key={index} picture={picture} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div
        onClick={async () => {
          localStorage.removeItem("user");
          navigate("/Login");
        }}
        className=" bg-darkRed text-white p-2 rounded-full cursor-pointer right-3 bottom-8  fixed z-10"
      >
        <FaSignOutAlt size={30} />
      </div>
    </>
  );
};

export default HomePage;

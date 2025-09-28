import Image from "next/image";
import React from "react";
import ImageUploading from "react-images-uploading";

const FileUpload = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <div
      className={`
      px-2.5 m-5 pt-4 bg-gray-300 rounded-xl border border-gray-600  flex justify-center justify-items-center`}
    >
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        // maxFileSize={15}
        acceptType={["jpg", "gif", "png", "webp"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper ">
            {images.length == 0 ? (
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className="text-center font-[NunitoBold] text-gray-800 text-xl mx-auto block"
              >
                Click or Drop here Cover
                <svg
                  className="w-24 h-14 text-gray-400 dark:text-white mx-auto block"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <div></div>
            )}
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <Image
                  src={image["data_url"]}
                  alt=""
                  width={400}
                  height={400}
                />
                <div className="image-item__btn-wrapper flex flex-wrap gap-10 justify-center justify-items-center my-10">
                  <button
                    onClick={() => onImageUpdate(index)}
                    className="bg-gray-800 text-white rounded border m-2 p-2 cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onImageRemove(index)}
                    className="bg-red-800 text-white rounded border m-2 p-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default FileUpload;

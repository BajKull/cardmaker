import { v4 } from "uuid";

const createCanvasImage = async (amount, event) => {
  return new Promise((res, rej) => {
    const img = new Image();
    const source = event.target.src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let divider = 1;
      if (img.height > 512 || img.width > 512)
        img.height > img.width
          ? (divider = img.height / 512)
          : (divider = img.width / 512);

      const myEl = {
        id: v4(),
        name: `Image ${amount}`,
        type: "image",
        src: source,
        image: img,
        posX: 150,
        posY: 150,
        rotation: 0,
        width: parseInt(img.width / divider),
        height: parseInt(img.height / divider),
        visible: true,
      };

      res(myEl);
    };

    img.onerror = () => rej("There was an error downloading your image.");

    img.src = source;
  });
};

export { createCanvasImage };

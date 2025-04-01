const ImageElement = ({ attributes, children, element }) => {
    return (
      <div {...attributes} contentEditable={false}>
        <div className="relative">
          <img
            src={element.url} // The image URL inserted in the editor
            alt="Inserted"
            className="max-w-full h-[400px] w-full "
            style={{ display: "block", maxWidth: "100%" }}
          />
        </div>
        {children}
      </div>
    );
  };
  
  export default ImageElement;
  
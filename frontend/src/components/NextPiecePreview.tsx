
const NextPiecePreview = ({nextPieces}) => {

  return (
    <div>
      {
        nextPieces.map((name, i) => {
          const imageURL = new URL(`../assets/images/${name}.png`, import.meta.url).href;
          return <img src={imageURL} key={i} alt={name} />
        })
      }
    </div>
  )
}

export default NextPiecePreview
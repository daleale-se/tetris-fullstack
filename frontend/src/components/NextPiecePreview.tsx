
const NextPiecePreview = ({nextPieces}) => {

  return (
    <div style={{display: "flex", flexDirection: "column-reverse", gap:"1rem"}}>
      {
        nextPieces.map((name, i) => {
          const imageURL = new URL(`../assets/images/${name}.png`, import.meta.url).href;
          return <img src={imageURL} key={i} alt={name} width={80}/>
        })
      }
    </div>
  )
}

export default NextPiecePreview
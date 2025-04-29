
const NextPiecePreview = ({nextPieces}) => {

  return (
    <div style={{display: "flex", flexDirection: "column-reverse", gap:"1rem"}}>
      {
        nextPieces.map((name, i) => {
          const imageURL = new URL(`../assets/images/${name}.png`, import.meta.url).href;

          if (name === "O") return <img src={imageURL} key={i} alt={name} style={{maxHeight:"40px", maxWidth:"40px"}}/>
          if (name === "I") return <img src={imageURL} key={i} alt={name} style={{maxHeight:"80px", maxWidth:"80px"}}/>
          
          return <img src={imageURL} key={i} alt={name} style={{maxHeight:"60px", maxWidth:"60px"}}/>
        })
      }
    </div>
  )
}

export default NextPiecePreview
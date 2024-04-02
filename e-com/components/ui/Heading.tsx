import React from "react"

interface HeadingsProps{
    title:String,
    description:String
}

const Heading:React.FC<HeadingsProps> = ({title,description}) => {
  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Heading

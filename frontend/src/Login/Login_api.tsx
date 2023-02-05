import { BuilderComponent, builder } from '@builder.io/react'
import { useEffect, useState } from 'react'

  builder.init('bcbea1c8ab7144f580c9fd8f074f7c15')
    
  export const MyComponent = () => {
    const [builderContentJson, setBuilderContentJson] = useState(null)
  
    useEffect(() => { 
      builder.get('page', { url: location.pathname })
        .promise().then(setBuilderContentJson)
    }, [])
  
    return <BuilderComponent model="page" content={builderContentJson} />
  }

  // Register your components for use in the visual editor!
  // https://www.builder.io/blog/drag-drop-react
  const Heading = props => (
    <h1 className="my-heading">{props.title}</h1>
  )
  
  builder.registerComponent(Heading, { 
    name: 'Heading',
    inputs: [{ name: 'title', type: 'text' }]
  })
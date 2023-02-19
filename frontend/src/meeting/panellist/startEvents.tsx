export type startEventProps = {
    IframeLink:string,
    meetingID:number
}

export function startEvent({IframeLink,meetingID}:startEventProps){
    const handleStartEvent = async()=>{
        try{
            const response = await fetch(`http://127.0.0.1:8080/meeting/${meetingID}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"}
            })

            if(response.ok){
                window.location.href = IframeLink
            }else{
                console.error("Error activating event link.")
            }
        }catch(error){
            console.error(error);
        }
    }

    return(<button onClick={handleStartEvent}>
        Start
    </button>)

}
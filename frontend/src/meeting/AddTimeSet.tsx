import React,{useState} from 'react'
import DateTimePicker from 'react-datetime-picker'
import './MeetingDetails.css'

type startTimeSetProps={
    value:Date,
    onChange:React.Dispatch<React.SetStateAction<Date>>,
}

type endTimeSetProps={
    value:Date
    endvalue:Date,
    endOnChange:React.Dispatch<React.SetStateAction<Date>>,
}


export function StartTime({value,onChange}:startTimeSetProps){

    return (
        <div>
        <DateTimePicker 
        format='yyyy-MM-dd h:mm:ss a'
        minDate={new Date()}
        value={value}
        onChange={onChange}
        className="div-13" />
      </div>
  
    )
}

export function EndTime({value,endvalue,endOnChange}:endTimeSetProps){

    return (
        <div>
        <DateTimePicker 
        format='yyyy-MM-dd h:mm:ss a'
        minDate={value}
        value={endvalue}
        onChange={endOnChange}
        className="div-13" />
      </div>

    )
}



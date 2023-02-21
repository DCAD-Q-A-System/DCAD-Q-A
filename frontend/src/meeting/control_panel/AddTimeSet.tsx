import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import '../meeting/MeetingDetails.css'
import 'bootstrap/dist/css/bootstrap.min.css'

type startTimeSetProps = {
    value: Date,
    onChange: React.Dispatch<React.SetStateAction<Date>>,
}

type endTimeSetProps = {
    value: Date
    endvalue: Date,
    endOnChange: React.Dispatch<React.SetStateAction<Date>>,
}

function CalenderIcon() {
    return <>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-calendar-check-fill" viewBox="0 0 16 16">
            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
        </svg>
    </>
}


export function StartTime({ value, onChange }: startTimeSetProps) {

    return (
        <div>
            <DateTimePicker
                calendarIcon={<CalenderIcon />}
                format='yyyy-MM-dd h:mm:ss a'
                minDate={new Date()}
                value={value}
                onChange={onChange}
                className="div-13" />
        </div>

    )
}

export function EndTime({ value, endvalue, endOnChange }: endTimeSetProps) {

    return (
        <div>
            <DateTimePicker
                calendarIcon={<CalenderIcon />}
                format='yyyy-MM-dd h:mm:ss a'
                minDate={value}
                value={endvalue}
                onChange={endOnChange}
                className="div-13" />
        </div>

    )
}



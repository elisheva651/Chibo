import React from 'react';
import { useState, useEffect } from 'react'



export default function Time() {

    const [elapsedTime, setElapsedTime] = useState(0);
    useEffect(() => {
        const startTime = Date.now();
    
        // Update the elapsed time every second
        const timer = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const seconds = (elapsedTime % 60).toString().padStart(2, '0');


    return (
            <div className='time'>
                <div className='text-time'>
                    {minutes}:{seconds}
                </div>
            </div>
            
    );
}

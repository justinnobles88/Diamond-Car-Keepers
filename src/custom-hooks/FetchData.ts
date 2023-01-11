import React, { useState, useEffect } from 'react';
import { server_calls } from '../api/server'

export const useGetData = () => {
		// Syntax: const [stateName, saveStateFunction] = importedHook<requiredDataType>(value passed in);
    const [contactData, setData] = useState<[]>([]);

		// This is a function that will get the data
    async function handleDataFetch(){
        const result = await server_calls.get();
        setData(result)
    }

		// This is the actual call of the function handleDataFetch, 
    // where the data is actually acquired
    useEffect( () => {
        handleDataFetch();
    }, [])
				// We return the data that we've saved
        return {contactData, getData:handleDataFetch}
  }
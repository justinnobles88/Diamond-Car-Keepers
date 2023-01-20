import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseEmail, choosePhone, chooseAddress } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/input';
import {Button} from '@material-ui/core';
import {server_calls} from '../../api/server';

interface BookFormProps {
  id?:string;
  data?:{}
}

interface BookState {
  make: string;
  model: string;
  color: string;
  year: string;
}

export const BookForm = (props:BookFormProps) => {
  

    const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
    const store = useStore();
    const name = useSelector<BookState>(state => state.make);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseName(data.make));
            dispatch(chooseEmail(data.model));
            dispatch(choosePhone(data.color));
            dispatch(chooseAddress(data.year));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }
  
  return (
    <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Vehicle</label>
                    <Input {...register('make')} name="make" placeholder='Make'/>
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name="model" placeholder='Model'/>
                </div>
                <div>
                    <label htmlFor="color">Color</label>
                    <Input {...register('color')} name="color" placeholder='Color'/>
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name="year" placeholder='Year'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    
  )
}
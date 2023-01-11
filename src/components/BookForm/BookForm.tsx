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
                    <label htmlFor="title">Vehicle</label>
                    <Input {...register('title')} name="make" placeholder='Make'/>
                </div>
                <div>
                    <label htmlFor="author">Model</label>
                    <Input {...register('author')} name="model" placeholder='Model'/>
                </div>
                <div>
                    <label htmlFor="cover">Color</label>
                    <Input {...register('cover')} name="color" placeholder='Color'/>
                </div>
                <div>
                    <label htmlFor="pages">Year</label>
                    <Input {...register('pages')} name="year" placeholder='Year'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    
  )
}
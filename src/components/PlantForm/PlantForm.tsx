//Imports from React and packages:
import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';

//Local Imports:
import { chooseName, chooseSpecies, chooseDescription, chooseClimate, chooseUses, chooseYears } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface PlantFormProps {
    id?:string;
    data?:{}
}

interface PlantState {
    name: string;
    species: string;
    description: string;
    typical_climate: string;
    known_uses: string;
    years_grown: number;
}

export const PlantForm = (props:PlantFormProps) => {

    const dispatch = useDispatch();
    let { plantData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<PlantState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseSpecies(data.species))
            dispatch(chooseDescription(data.description))
            dispatch(chooseClimate(data.typical_climate))
            dispatch(chooseUses(data.known_uses))
            dispatch(chooseYears(data.years_grown))
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Plant Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>

                <div>
                    <label htmlFor="species">Species</label>
                    <Input {...register('species')} name="species" placeholder="Species"/>
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>

                <div>
                    <label htmlFor="typical_climate">Typical Climate</label>
                    <Input {...register('typical_climate')} name="typical_climate" placeholder="Typical Climate"/>
                </div>

                <div>
                    <label htmlFor="known_uses">Known Uses</label>
                    <Input {...register('known_uses')} name="known_uses" placeholder="Known Uses"/>
                </div>

                <div>
                    <label htmlFor="years_grown">Years Grown</label>
                    <Input {...register('years_grown')} name="years_grown" placeholder="Years Grown"/>
                </div>

                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
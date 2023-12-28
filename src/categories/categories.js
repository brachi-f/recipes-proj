import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Form, Grid, GridColumn, Segment } from "semantic-ui-react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const schema = yup.object().shape({
    Name: yup.string().required(),
}).required();

const Categories = () => {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/category`)
            .then(x => setCategories(x.data))
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        console.log(data);
        if (categories.find(c => c.Name === data.Name))
            alert("קטגוריה קיימת")
        else
            axios.post(`http://localhost:8080/api/category`, { Id: 999, Name: data.Name })
                .then(x => setCategories(...categories, x.data))
    }
    return <>
        < Grid columns={2}>
            <GridColumn>
                <Segment.Group>
                    {categories.map((c) =>
                        <Segment key={c.Id} color="pink"> {c.Name} </Segment>
                    )}
                </Segment.Group>
            </GridColumn>
            <GridColumn>
                <Segment>
                    <Form {...handleSubmit(onSubmit)}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='הוספת קטגוריה' placeholder='שם הקטגוריה' {...register("Name")} />
                        </Form.Group>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </GridColumn>
        </Grid>
    </>
}
export default Categories
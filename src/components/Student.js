import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const student={name,address}
    console.log(student)
    fetch("https://metaverso-back2.azurewebsites.net/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)

  }).then(()=>{
    console.log("New Student added")
  })
}

useEffect(()=>{
  fetch("https://metaverso-back2.azurewebsites.net/student/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setStudents(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Adicionar Pessoa</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Nome da Pessoa" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Endereço" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Enviar
</Button>
    </form>
   
    </Paper>
    <h1>Pessoas</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Nome:{student.name}<br/>
         Endereço:{student.address}
        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "./ChangeLanguage";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100vh",
  },
  paper: {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
  },
}));

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.preventDefault();

    const student = { name, address };
    console.log(student);
    fetch("https://metaverso-back2.azurewebsites.net/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    fetch("https://metaverso-back2.azurewebsites.net/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container className={classes.container}>
      <ChangeLanguage />

      <Box>
        <Paper elevation={3} className={classes.paper}>
          <h1 style={{ color: "blue" }}>
            <u>{t("components.student.add_title")}</u>
          </h1>

          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label={t("components.student.name_input")}
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={t("components.student.address_label")}
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={(e) => handleClick(e)}
            >
              {t("components.student.send")}
            </Button>
          </form>
        </Paper>
        <h1>{t("components.student.people")}</h1>

        <Paper elevation={3} className={classes.paper}>
          {students.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              key={student.id}
            >
              Id:{student.id}
              <br />
              {t("components.student.name_label")}:{student.name}
              <br />
              {t("components.student.address_label")}:{student.address}
            </Paper>
          ))}
        </Paper>
      </Box>
    </Container>
  );
}

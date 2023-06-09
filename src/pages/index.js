import EastIcon from "@mui/icons-material/East";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import nflLogo from "../../public/nfl-logo.svg";

import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
const inter = Inter({ subsets: ["latin"] });

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [nfl, setNfl] = useState([]);

  const getTeam = (id) => {
    nfl.divisions.teams.filter(id);
  };

  const handleClick = (idTeam) => {
    handleOpen;
    getTeam(idTeam);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:3050/conferences")
      .then((response) => {
        setNfl(response.data);
      })
      .catch((err) => {
        console.error(`Iiiii deu ruim!!!  ${err}`);
      });
  }, []);

  return (
    <>
      <Head>
        <title> .: NFL :. </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="icon"
          href="https://static.www.nfl.com/league/run3dfyjniqxah4ehxfu"
        ></link>
      </Head>
      <div>
        <h1>
          {" "}
          <Image src={nflLogo} width={50} height={50} alt="Team image" />
          NFL - National Football League <SportsFootballIcon />
        </h1>
      </div>
      <div className="container">
        <ul className="navUl">
          {nfl.map((afcTeams) => (
            <li className="navLi" key={afcTeams.id}>
              <SportsFootballIcon />
              {afcTeams.name}
              <ul className="navUl">
                {afcTeams.divisions.map((division) => (
                  <li className="liDiv" key={division.id}>
                    <EastIcon /> Divisão: {division.alias}
                    <Box className="boxTeams" sx={{ flexGrow: 3 }}>
                      <Grid2
                        container
                        spacing={{ xs: 2, md: 4 }}
                        columns={{ xs: 4, sm: 4, md: 4 }}
                      >
                        {division.teams.map((team) => (
                          <Grid2
                            xs={2}
                            sm={4}
                            md={2}
                            key={team.id}
                            style={{
                              color: "lime",
                              background: `linear-gradient(100deg,${team.team_colors[0].hex_color},${team.team_colors[1].hex_color})`,
                            }}
                          >
                            <Button onClick={handleClick}>
                              <Avatar
                                src={team.venue.image}
                                sx={{ width: 66, height: 66 }}
                              />
                              {team.name}
                            </Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              key={team.id}
                            >
                              <Box
                                sx={{
                                  ...style,
                                  with: 400,
                                  background: `linear-gradient(100deg,${team.team_colors[0].hex_color},${team.team_colors[1].hex_color})`,
                                }}
                              >
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  <Avatar
                                    src={team.venue.image}
                                    sx={{ width: 66, height: 66 }}
                                  />
                                  {team.name}
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                >
                                  <p>Estádio: {team.venue.name}</p>
                                  <p>Capacidade: {team.venue.capacity}</p>
                                  <p>Gramado: {team.venue.surface}</p>
                                  <p>Telhado: {team.venue.roof_type}</p>
                                  <p>
                                    Endereço: {team.venue.address} - Zip:{" "}
                                    {team.venue.zip}
                                  </p>
                                  <p>
                                    Cidade: {team.venue.city} -{" "}
                                    {team.venue.state}
                                  </p>
                                  <p>
                                    Localização:
                                    <a
                                      href={`https://www.google.com/search?q=${team.venue.location.lat},${team.venue.location.lng}`}
                                      target="_blank"
                                    >
                                      {team.venue.location.lat},
                                      {team.venue.location.lng}
                                    </a>
                                  </p>
                                </Typography>
                              </Box>
                            </Modal>
                          </Grid2>
                        ))}
                      </Grid2>
                    </Box>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

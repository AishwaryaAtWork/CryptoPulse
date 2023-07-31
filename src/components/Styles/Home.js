import { makeStyles } from "@material-ui/core/styles";
import BannerImg from '../assets/banner2.jpg';

export default makeStyles({
    banner: {
        backgroundImage: `url(${BannerImg})`,
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
      carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
      },
      carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      },
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
});
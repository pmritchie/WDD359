import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = {
  card: {
    minWidth: 240,
    maxWidth: 240,
    minHeight: 300,
    maxHeight: 350,
    margin: '1rem',
    fontFamily: "'Freckle Face', cursive",
    backgroundColor: "#93B1AF",
    borderRadius: "5px",

  },
  media: {
    padding: ".5rem",
    objectFit: 'cover',
    minHeight: 200,
  },
  button: {
    justifyContent: "center",
  },
};









function ImgMediaCard(props) {
  const { classes,  } = props;
  
  return (
    <Card className={classes.card} id={props.id}>
      <CardActionArea onClick={props.detailed}>
        <CardMedia 
          component="img"
          alt={props.alt}
          className={classes.media}
          height="140"
          image={props.image}
          title={props.title}
          birthday={props.birthday}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={props.style}>
            {props.title}
          </Typography>
          <Typography gutterBottom component="p" style={props.style}>
            {props.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={styles.button}>
      <IconButton aria-label="Add to favorites" onClick={props.addFav} style={styles.button} className="btn">
        <FavoriteIcon className="notActive"/>
      </IconButton>
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);


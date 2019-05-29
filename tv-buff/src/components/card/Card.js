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
    margin: '1rem'
  },
  media: {
    padding: ".5rem",
    objectFit: 'cover',
  },
  fav : {
    justifyContent: "center"
  }
};
// export default ({addFav,id, alt, image, title, birthday, rating}) =>
// <Card  id={id} style={styles.card}>
//       <CardActionArea >
//         <CardMedia 
//           component="img"
//           alt={alt}
//           style={styles.media}
//           height="140"
//           image={image}
//           title={title}
//           birthday={birthday}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             {title}
//           </Typography>
//           <Typography gutterBottom component="p">
//             {rating}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions style={styles.fav}>
//       <IconButton aria-label="Add to favorites" addFav={addFav}>
//         <FavoriteIcon />
//       </IconButton>
//       </CardActions>
//     </Card>








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
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography gutterBottom component="p">
            {props.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="Add to favorites" onClick={props.addFav}>
        <FavoriteIcon />
      </IconButton>
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);


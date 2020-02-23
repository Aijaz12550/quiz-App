import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Low',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Medium',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Hard',
  },
  
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ({
    levelHandler,
    level
})=> {
  return (
    <div>
      <Box  mb={3} borderColor="transparent"  onChange={levelHandler}>
  <Typography component="legend">Quiz Level ({level}}</Typography>
        <Rating
          name="customized-empty"
          defaultValue={1}
          precision={1}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
     
      
      
    </div>
  );
}
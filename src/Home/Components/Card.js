import React from 'react'
import {
    Grid,
    makeStyles,
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    CardMedia,
} from '@material-ui/core'
import { connect } from 'react-redux'
import Image from 'material-ui-image'

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: theme.spacing(2),
    },
    card: {
        width: 275,
        maxHeight: 374,
        overflow: 'hidden'
    },
    cardMargin: {
        margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    gutterBottom: {
        marginBottom: theme.spacing(2),
    },
    cardHeader: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 1,
        '-webkit-box-orient': 'vertical',
    },
}))

const CustomImageComponent = imgLink => {
    return () => (
        <Image
            src={imgLink}
            disableSpinner
            aspectRatio={16/9}
            animationDuration={1000}
        />
    )
}

const CardComponent = ({ dictionary, quizee, onClick }) => {
    const classes = useStyles()

    return (
        <Grid item className={classes.cardMargin} key={quizee.id}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    component={CustomImageComponent(quizee.img || `http://placeimg.com/275/155/any?t=${Math.random()}`)}
                />
                <CardContent>
                    <Typography variant='h5' component='h2' gutterBottom className={classes.cardHeader} title={quizee.caption}>
                        {quizee.caption}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" noWrap>
                        {''.concat(dictionary.quizeeCard.QUESTIONS_COUNT, quizee.questionsCount)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small'
                        onClick={onClick}>
                        {dictionary.quizeeCard.START_TEST}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

const mapStateToProps = state => ({
    dictionary: state.Global.dictionary.Home
})

export default connect(mapStateToProps)(CardComponent)
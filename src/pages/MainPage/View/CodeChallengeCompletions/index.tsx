import React, { useMemo } from 'react'
import Typography from 'material-ui/Typography'
import UikitUserLink from 'src/uikit/Link/User'
import { MainPageCodeChallengeCompletionsProps } from './interfaces'
import Paper from 'material-ui/Paper'
import Slider, { Settings } from 'react-slick'
import ChallengeDescription from 'src/pages/learn/CodeChallenge/View/SidePanel/ChallengeDescription'
import Grid from 'src/uikit/Grid'
import Link from 'next/link'

const MainPageCodeChallengeCompletions: React.FC<MainPageCodeChallengeCompletionsProps> = ({
  objects,
}) => {
  return useMemo(() => {
    const settings: Settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }

    return (
      <>
        <Paper className="paper">
          <Typography variant="title" className="paper--title">
            Решенные задания
          </Typography>

          <Slider {...settings}>
            {objects.map((n) => {
              return (
                <div key={n.id} className="slider--content">
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography variant="subheading">
                        <Link href={`/learn/exercises/${n.CodeChallenge.id}`}>
                          <a
                            title={
                              n.CodeChallenge.localeTitle ||
                              n.CodeChallenge.name ||
                              ''
                            }
                          >
                            {n.CodeChallenge.localeTitle ||
                              n.CodeChallenge.name}
                          </a>
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <UikitUserLink user={n.CreatedBy} />
                    </Grid>
                  </Grid>

                  <ChallengeDescription
                    key={n.id}
                    description={n.CodeChallenge.description || ''}
                    instructions={n.CodeChallenge.instructions || ''}
                  />
                </div>
              )
            })}
          </Slider>
        </Paper>
      </>
    )
  }, [objects])
}

export default MainPageCodeChallengeCompletions

import React from 'react'
import { TechnologyViewProps } from './interfaces'
import { TechnologyViewStyled } from './styles'
// import Link from 'next/link'
import Typography from 'material-ui/Typography'
import UikitUserLink from 'src/uikit/Link/User'
import Grid from 'src/uikit/Grid'

const TechnologyView: React.FC<TechnologyViewProps> = (props) => {
  const technology = props.object

  if (!technology) {
    return null
  }

  return (
    <TechnologyViewStyled>
      <Typography variant="title">{technology.name}</Typography>

      <div className="technology--used-by">
        <Typography variant="subheading">Кто использует</Typography>

        <Grid container spacing={8}>
          {technology.UserTechnologies?.map((n) => {
            const user = n.CreatedBy

            if (!user) {
              return null
            }

            return (
              <Grid key={user.id} item xs={12}>
                <UikitUserLink user={user} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </TechnologyViewStyled>
  )
}

export default TechnologyView

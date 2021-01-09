import React from 'react'
import { MainPageStudentsProps } from './interfaces'

import UikitUserLink from 'src/uikit/Link/User'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'

const MainPageStudents: React.FC<MainPageStudentsProps> = ({ objects }) => {
  return (
    <>
      <Paper className="paper">
        <Typography variant="title" className="paper--title">
          Новые ученики
        </Typography>

        {objects.map((n) => (
          <UikitUserLink key={n.id} user={n} />
        ))}
      </Paper>
    </>
  )
}

export default MainPageStudents

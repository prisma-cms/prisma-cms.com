import React from 'react';
import { ObjectsListView, styles } from 'src/components/view/List';

import withStyles from 'material-ui/styles/withStyles';
import { UsersViewProps } from './interfaces';
import { ColumnConfig } from 'apollo-cms/lib/DataView/List/Table';
import { UsersConnectionUserFragment } from 'src/modules/gql/generated';
import UserLink from 'src/next/src/components/ui/Link/User';
import moment from 'moment';
import ProjectLink from 'src/next/src/components/ui/Link/Project';
import Link from 'next/link';
import Typography from 'material-ui/Typography';

class UsersView<P extends UsersViewProps = UsersViewProps> extends ObjectsListView<P> {

  static defaultProps = {
    ...ObjectsListView.defaultProps,
    title: 'Чат-комнаты',
  }


  getColumns<CC extends UsersConnectionUserFragment>(): ColumnConfig<CC>[] {

    return [
      {
        id: "id",
        key: "id",
        label: "Пользователь",
        renderer: (_value, record) => {
          return <UserLink
            user={record}
          />
        },
      },
      {
        id: "createdAt",
        key: "createdAt",
        label: "Дата регистрации",
        renderer: (value: CC["createdAt"]) => {
          return moment(value).format('ll');
        },
      },
      {
        id: 'ProjectsCreated',
        label: 'Создал проекты',
        renderer: (value: CC["ProjectsCreated"], record) => {
          const { username } = record

          let output

          const max = 3

          if (value && value.length) {
            const projects = value.map((n) => {
              const { id } = n

              return <ProjectLink key={id} object={n} />
            })

            const listProjects: any[] = projects.splice(0, max)

            const moreProjects = projects.length

            output = (
              <>
                {listProjects.reduce((a, b) => [a, ', ', b])}{' '}
                {moreProjects ? (
                  <Link
                    // TODO поправить ссылки
                    href={`/projects?filters=%7B"CreatedBy"%3A%7B"username"%3A"${username}"%7D%7D`}
                  >
                    <a>
                      <Typography variant="caption">
                        и еще {moreProjects}
                      </Typography>
                    </a>
                  </Link>
                ) : null}
              </>
            )
          }

          return output
        },
      },
      {
        id: 'Projects',
        // numeric: false,
        // disablePadding: false,
        label: 'Участвует в проектах',
        renderer: (value: CC["Projects"], record) => {
          const { username } = record

          let output

          const max = 3

          if (value && value.length) {
            const projects = value.map((n) => {
              const { id, Project } = n

              return <ProjectLink key={id} object={Project} />
            })

            const listProjects: any[] = projects.splice(0, max)

            const moreProjects = projects.length

            output = (
              <>
                {listProjects.reduce((a, b) => [a, ', ', b])}{' '}
                {moreProjects ? (
                  <Link
                    // TODO поправить ссылки
                    href={`/projects?filters=%7B"Members_some"%3A%7B"User"%3A%7B"username"%3A"${username}"%7D%7D%7D`}
                  >
                    <a>
                      <Typography variant="caption">
                        и еще {moreProjects}
                      </Typography>
                    </a>
                  </Link>
                ) : null}
              </>
            )
          }

          return output
        },
      },
    ];
  }
}

export default withStyles(styles)((props: UsersViewProps) => <UsersView {...props} />);

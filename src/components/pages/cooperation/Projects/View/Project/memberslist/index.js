import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import PlusIcon from 'material-ui-icons/PlusOne'
import FaceIcon from 'material-ui-icons/Face'

import { LabelCheckbox } from 'material-ui/Checkbox'

import { Avatar } from '@modxclub/ui'

/*
  Выдавало ошибку на childrenClassName
  Видимо из-за неактуальности реакт-компонентов иконок и т.п.
*/
class FaceAvatar extends Component {
  render() {
    const { childrenClassName, ...other } = this.props

    return <FaceIcon {...other} />
  }
}

const defaultProps = {}

export default class MembersListEditor extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    updateProject: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired,
    removeMember: PropTypes.func.isRequired,
  }

  static contextTypes = {
    request: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      users: [],
      services: [],
      member_query: '',
    }
  }

  // componentWillMount(){

  // }

  componentDidMount() {
    const { request } = this.context

    request(
      'services',
      true,
      'services/getdata',
      {},
      {
        callback: (data, errors) => {
          if (data.success && data.object) {
            this.setState({
              services: data.object,
            })
          }
        },
      }
    )

    return
  }

  componentDidUpdate(prevProps, prevState) {
    // Если был изменен поисковый запрос, то обновляем список пользователей
    const { member_query } = this.state

    if (member_query != prevState.member_query) {
      this.loadUsers()
    }

    return
  }

  loadUsers() {
    const { request } = this.context

    const { member_query } = this.state

    if (!member_query) {
      this.setState({
        users: [],
      })

      return
    }

    request(
      'users',
      false,
      'users/getdata',
      {
        search: member_query,
        limit: 5,
      },
      {
        callback: (data, errors) => {
          if (data.success && data.object) {
            this.setState({
              users: data.object,
            })
          }
        },
      }
    )
  }

  onChange = (event) => {
    const { name, value } = event.target

    const newState = {}

    newState[name] = value

    this.setState(newState)

    return
  }

  updateMemberServices(event, members, member, service_id) {
    const { checked } = event.target

    const services = member.services

    // return;

    const index = services.findIndex((n) => n == service_id)

    if (checked) {
      if (index === -1) {
        services.push(service_id)
      }
    } else {
      if (index != -1) {
        services.splice(index, 1)
      }
    }

    return this.updateProject({
      members,
    })
  }

  addMemberToProject(member, user) {
    if (!member || !user) {
      return
    }

    const { item } = this.props

    const { members } = item

    Object.assign(member, {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      photo: user.photo,
      // services: [],
    })

    // members.push(member);

    this.updateProject({ members })
    return
  }

  updateProject(data) {
    const { item, updateProject } = this.props

    return updateProject(item, data)
  }

  render() {
    const { item, updateProject, addMember, removeMember } = this.props

    const { member_query, users } = this.state

    if (!item) {
      return
    }

    const { members } = item

    const { services } = this.state

    const members_list = []

    members.map((member) => {
      const { id, username, fullname, photo, services: member_services } = member

      members_list.push(
        <Grid key={id || `list_${members_list.length}`} item xs={12}>
          <Paper
            style={{
              padding: 10,
            }}
          >
            <Chip
              // onTouchTap={this.showUserProfile.bind(this, member.username)}
              className="link"
              style={{
                margin: 4,
              }}
              label={fullname || username || 'Аноним'}
              avatar={
                photo ? (
                  <Avatar
                    type="small"
                    avatar={photo}
                    username={(fullname || username || '')
                      .substr(0, 1)
                      .toUpperCase()}
                  />
                ) : (
                  <FaceAvatar />
                )
              }
              onRequestDelete={(event) => {
                event.stopPropagation()
                event.preventDefault()
                removeMember(member)
              }}
            />

            {id > 0 ? (
              <div>
                {services.map((service) => {
                  const { id: service_id, pagetitle: service_name } = service

                  return (
                    <LabelCheckbox
                      key={service_id}
                      label={service_name}
                      checked={
                        member_services &&
                        member_services.find((id) => id == service_id)
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        this.updateMemberServices(
                          event,
                          members,
                          member,
                          service_id
                        )
                      }
                    />
                  )
                })}

                {!member_services || !member_services.length ? (
                  <Typography
                    style={{
                      color: 'red',
                    }}
                  >
                    Необходимо указать минимум одно направление, по каторому
                    пользователь принимал участие в проекте. Если не указано, то
                    пользователь не будет включен в список участников.
                  </Typography>
                ) : null}
              </div>
            ) : (
              <div>
                <TextField
                  label="Список пользователей"
                  helperText="Введите логин, емейл или ФИО, чтобы найти нужного специалиста"
                  value={member_query}
                  name="member_query"
                  onChange={(event) => this.onChange(event)}
                />

                {users && users.length ? (
                  <Grid container gutter={0}>
                    {users.map((user) => {
                      const { id, username, fullname, photo } = user

                      if (members.find((n) => n.id == id)) {
                        return null
                      }

                      return (
                        <Chip
                          key={id}
                          onTouchTap={(event) => {
                            return this.addMemberToProject(member, user)
                          }}
                          className="link"
                          style={{
                            margin: 4,
                          }}
                          label={fullname || username || 'Аноним'}
                          avatar={
                            photo ? (
                              <Avatar
                                type="small"
                                avatar={photo}
                                username={(fullname || username || '')
                                  .substr(0, 1)
                                  .toUpperCase()}
                              />
                            ) : (
                              <FaceAvatar />
                            )
                          }
                        />
                      )
                    })}
                  </Grid>
                ) : null}
              </div>
            )}
          </Paper>
        </Grid>
      )
    })

    members_list.push(
      <Grid key={`list_${members_list.length}`} item xs={12}>
        <Paper
          style={{
            padding: 10,
          }}
        >
          <Button onClick={(event) => addMember()}>
            <PlusIcon />
            {!members_list.length
              ? `Добавить участника`
              : `Добавить еще участника`}
          </Button>
        </Paper>
      </Grid>
    )

    return <Grid container>{members_list}</Grid>
  }
}

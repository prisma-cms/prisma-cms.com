import React from 'react'

import PrismaCmsUserPageView from '@prisma-cms/front/lib/components/pages/UsersPage/UserPage/View'

import NotificationTypes from './NotificationTypes'

import EthWallet from './EthWallet'

import ChatRooms from './ChatRooms'

export default class UserPageView extends PrismaCmsUserPageView {
  getWalletAddress() {
    const object = this.getObjectWithMutations()

    const { ethWallet } = object

    const { address } = this.getEthAccount() || {}

    return ethWallet || address
  }

  getEthAccount() {
    const object = this.getObjectWithMutations()

    const { EthAccounts } = object

    return (EthAccounts && EthAccounts[0]) || null
  }

  renderDefaultView() {
    const object = this.getObjectWithMutations()
    const inEditMode = this.isInEditMode()

    const { id: userId } = object

    const { mutate } = this.props

    const { user: currentUser, Grid } = this.context

    const ethAccount = this.getEthAccount()

    // const {
    //   balance,
    // } = EthAccounts && EthAccounts[0] || {};

    // const {
    //   changePassword,
    // } = this.state;

    const { id: currentUserId } = currentUser || {}

    // const ethWallet = this.getWalletAddress();

    return (
      <Grid container spacing={16}>
        <Grid item>{this.renderAvatar()}</Grid>

        <Grid item xs>
          <Grid container spacing={16}>
            <Grid
              item
              xs={12}
              // md={6}
            >
              <ChatRooms user={object} currentUser={currentUser} />
            </Grid>

            {ethAccount || (currentUserId && currentUserId === userId) ? (
              <Grid item xs={12} md={6}>
                <EthWallet
                  // ethAccount={ethAccount}
                  user={object}
                  currentUser={currentUser}
                />
              </Grid>
            ) : null}

            <Grid item xs={12} md={6}>
              <NotificationTypes
                user={object}
                inEditMode={inEditMode}
                mutate={mutate}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderEditableView() {
    // return <UserView
    //   {...this.props}
    // />

    const object = this.getObjectWithMutations()
    const inEditMode = this.isInEditMode()

    const { mutate } = this.props

    const { Grid } = this.context

    const ethWallet = this.getWalletAddress()

    return (
      <Grid container spacing={16}>
        <Grid item>{this.renderAvatar()}</Grid>

        <Grid item xs>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12}>
                {this.getTextField({
                  name: 'ethWallet',
                  helperText: 'Сменить ethereum кошелек',
                  label: 'Адрес кошелька',
                  value: ethWallet || '',
                  disabled: true,
                })}
              </Grid>

              <Grid item xs={12}>
                {this.getTextField({
                  name: 'fullname',
                  helperText: 'Отображаемое на сайте имя',
                  label: 'Имя',
                })}
              </Grid>

              <Grid item xs={12}>
                <input
                  style={{
                    height: 1,
                    opacity: 1,
                    padding: 0,
                    margin: 0,
                    border: 0,
                  }}
                />

                <div>
                  {this.getTextField({
                    name: 'password',
                    type: 'password',
                    label: 'Пароль',
                    helperText: 'Новый пароль',
                  })}
                </div>
              </Grid>

              <Grid item xs={12}>
                {this.getTextField({
                  name: 'email',
                  helperText: 'Сменить емейл',
                  label: 'Емейл',
                })}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <NotificationTypes
                user={object}
                inEditMode={inEditMode}
                mutate={mutate}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

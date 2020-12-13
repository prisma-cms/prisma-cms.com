import { Scalars } from 'src/modules/gql/generated'
import { TypedTypePolicies } from 'src/modules/gql/generated/helpers/apollo-helpers'

const DateTime = (
  v: string | null | undefined
): Scalars['DateTime'] | null | undefined => {
  return typeof v === 'string' ? new Date(v) : v
}

export const typePolicies: TypedTypePolicies = {
  Resource: {
    fields: {
      createdAt: DateTime,
      updatedAt: DateTime,
    },
  },
  Task: {
    fields: {
      createdAt: DateTime,
      updatedAt: DateTime,
    },
  },
  Timer: {
    fields: {
      createdAt: DateTime,
      updatedAt: DateTime,
      stopedAt: DateTime,
    },
  },
  User: {
    fields: {
      createdAt: DateTime,
      updatedAt: DateTime,
    },
  },
  Tag: {
    fields: {
      createdAt: DateTime,
      updatedAt: DateTime,
    },
  },
  CodeChallengeBlock: {
    fields: {
      createdAt: DateTime,
      updatedAt: DateTime,
    },
  },
  CodeChallenge: {
    fields: {
      createdAt: DateTime,
      updatedAt: DateTime,
    },
  },
}

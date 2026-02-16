import { DocumentNode, print } from 'graphql';

const GRAPHQL_ENDPOINT = 'http://localhost:5050/v1/graphql';

export async function graphqlRequest<T, V = Record<string, any>>(
  query: DocumentNode,
  variables?: V
): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  });

  const body = (await response.json()) as { data: T; errors?: any[] };

  if (body.errors) {
    console.error('GraphQL Errors:', body.errors);
    throw new Error(body.errors[0].message);
  }

  return body.data;
}

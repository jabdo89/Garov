import { gql } from "@apollo/client";

const CREATE_LOCATION = gql`
  mutation createLocation($location: LocationCreate!) {
    createLocation(location: $location) {
      id
    }
  }
`;

const UPDATE_LOCATION = gql`
  mutation updateLocation($id: ID!, $location: LocationUpdate!) {
    updateLocation(id: $id, location: $location) {
      id
    }
  }
`;

const VALIDATE_COORDINATES = gql`
  query validCoordinates($point: GeoJSONInput!) {
    validCoordinates(point: $point) {
      id
    }
  }
`;

export { CREATE_LOCATION, UPDATE_LOCATION, VALIDATE_COORDINATES };

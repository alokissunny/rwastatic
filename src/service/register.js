import axios from 'axios';
export function register (regData ) {
    axios
    .post("/api/subdomain/create", regData)
    .then( this.props.history.push('/'))
    .catch( this.props.history.push('/'))
}
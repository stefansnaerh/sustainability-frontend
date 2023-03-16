import { NavLink } from "react-router-dom"
import "./NotFound.scss"

function NotFound() {
  return (
    <section className="NotFound-container">
      <article className="clouds">

      </article>
      <h1>404</h1>
      <h2>This page "Be broken"</h2>
      <article className="button-container">
        <NavLink to={"/"}>Go back</NavLink>
       
      </article>
      
    </section>
  )
}

export default NotFound
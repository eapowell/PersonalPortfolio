*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }


body {
    display: block;
    font-family: Helvetica, sans-serif;
    background-color: black;
    color: white;
}

header {
    display: flex;
    align-content: center;
  }

header img {
    max-height: 150px;
}

header h1 {
    font-size: 6rem;
}

#nav {
    display: flex;
    list-style: none;
    justify-content: space-around;
    width: 320px;
}

navbar a {
    color: white;
    text-decoration: none;
}

navbar a:hover {
    color: #fded11;
}

navbar {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    width: 100%; 
    height: 100px;
    align-items: center;
}

navbar li {
    font-size: 1 rem;
}


main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 4rem;
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
    margin-bottom: 6rem;
    
}


header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

button {
    padding: 20px;
    font-size: 1.5rem;
    border-radius: 10% / 50%;
    visibility: visible;
    margin: 20px;
}

img {
    width: 250px;
}

div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid white;
    padding: 5px;
}

h2 p {
    margin: 0;
}

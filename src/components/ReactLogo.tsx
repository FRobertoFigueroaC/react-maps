import logo from '../logo.svg'
export const ReactLogo = () => {
  return (
    <img alt='React Logo'
      src={logo}
      style={{
        position: 'fixed',
        bottom: '5%',
        right: '5%',
        zIndex: 999,
        width: '10%'
      }}/>
  )
}

import { theme } from "antd"

export const Title: React.FC = () => {
    const { token} = theme.useToken()


    return (
        <div  style={{ color: token.colorTextHeading, fontWeight: token.fontWeightStrong, fontSize: token.fontSizeLG }}>SocksAdmin</div>
    )
}
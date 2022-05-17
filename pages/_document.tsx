import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initalProps = await Document.getInitialProps(ctx)

        return initalProps
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="short cut icon"
                        href="/fabicon.ico"
                    />
                    
                </Head>
                <body>
                
                <script src="//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"></script>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
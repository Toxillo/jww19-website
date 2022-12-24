# Website of the Josef-Wirth-Weg 19 dorm

## Updating Content
`src/content/`

## Development
1. Build development container
   ```shell
   cd jww19/dev
   docker build -t jww19-dev .
   ```
2. Run the development container
   ```shell
   cd jww19/
   docker run -dp 3000:80 -v "$(pwd)/public:/var/www/jww19/public" jww19-dev
   ```
3. Build static pages (needs to be re-run on content changes)
   ```shell
   cd jww19/
   npm i && npm run build
   ```

# ------------  BASE   ------------
FROM node AS base

# Create app directory
WORKDIR /usr/src/app



# --------- DEPENDENCIES  ---------
FROM base AS dependencies

# Copy package*.json second to last for build efficiency as this changes second most
COPY package*.json ./

# Install node modules
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production

# Install development node_modules as well
RUN npm install

# Copy app source code last for build efficiency as this changes the most
COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./


# ------------  BUILD  ------------
FROM dependencies as build



# Build source
RUN npm run build

# ------------ RELEASE ------------
FROM nginx:alpine AS release

COPY --from=build /usr/src/app/build /usr/share/nginx/html
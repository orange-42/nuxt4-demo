# 使用 Node 20 Alpine 作为基础镜像
FROM node:20-alpine AS base

# 设置工作目录
WORKDIR /app

# --- 构建阶段 ---
FROM base AS build

# 复制依赖文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# --- 运行阶段 ---
FROM base AS run

# 复制构建产物
COPY --from=build /app/.output ./.output

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=production

# 启动命令
CMD ["node", ".output/server/index.mjs"]

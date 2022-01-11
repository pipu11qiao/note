-- 获取 http get/post 请求参数

function get_args()
  -- 获取 http 请求方式 get/post
  local request_method = ngx.var.request_method
  -- 这里是一个 table，包含所有 get 请求参数
  local args = ngx.req.get_uri_args()
  -- 如果是 post 参数获取
  if "POST" == request_method then
      -- 先读取请求体
      ngx.req.read_body()
      -- 这里也是一个 table，包含所有 post 请求参数
      local post_args = ngx.req.get_post_args()
      if post_args then
          for k, v in pairs(post_args) do
              args[k] = v
          end
      end
  end
  return args
end

-- 获取请求参数列表
local args = get_args()

-- 获取 key 为 name 的值
local name = args['name']

-- 输出结果
ngx.say("<p>hello " .. name .. "!</p>")
// 配置常量
const CONFIG = {
    API: {
        BASE_URL: "https://fragments.e2b.dev",
        API_KEY: "sk-123456"//自定义你自己的认证密钥，记得修改
    },
    RETRY: {
        MAX_ATTEMPTS: 1,
        DELAY_BASE: 1000
    },
    MODEL_CONFIG: {
        "o1-preview": {
            id: "o1",
            provider: "OpenAI",
            providerId: "openai",
            name: "o1",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 2,
                max_tokensMax: 0,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 500
            }
        },
        "o3-mini": {
    id: "o3-mini",
    provider: "OpenAI",
    providerId: "openai",
    name: "o3 Mini",
    multiModal: true,
    Systemprompt: "",
    opt_max: {
        temperatureMax: 2,
        max_tokensMax: 4096,
        presence_penaltyMax: 2,
        frequency_penaltyMax: 2,
        top_pMax: 1,
        top_kMax: 500
    }
},
        "gpt-4o": {
            id: "gpt-4o",
            provider: "OpenAI",
            providerId: "openai",
            name: "GPT-4o",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 2,
                max_tokensMax: 16380,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 500
            }
        },
        "gpt-4-turbo": {
            id: "gpt-4-turbo",
            provider: "OpenAI",
            providerId: "openai",
            name: "GPT-4 Turbo",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 2,
                max_tokensMax: 16380,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 500
            }
        },
        "gemini-1.5-pro": {
            id: "gemini-1.5-pro-002",
            provider: "Google Vertex AI",
            providerId: "vertex",
            name: "Gemini 1.5 Pro",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 2,
                max_tokensMax: 8192,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 500
            }
        },
        "gemini-exp-1121": {
            id: "gemini-exp-1121",
            provider: "Google Generative AI",
            providerId: "google",
            name: "Gemini Experimental 1121",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 2,
                max_tokensMax: 8192,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 40
            }
        },
        "gemini-2.0-flash-exp": {
            id: "models/gemini-2.0-flash-exp",
            provider: "Google Generative AI",
            providerId: "google",
            name: "Gemini 2.0 Flash",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 2,
                max_tokensMax: 8192,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 40
            }
        },
        "claude-3-5-sonnet-latest": {
            id: "claude-3-5-sonnet-latest",
            provider: "Anthropic",
            providerId: "anthropic",
            name: "Claude 3.5 Sonnet",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 1,
                max_tokensMax: 8192,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 500
            }
        },
                "claude-3-7-sonnet-latest": {
            id: "claude-3-7-sonnet-latest",
            provider: "Anthropic",
            providerId: "anthropic",
            name: "Claude 3.7 Sonnet",
            multiModal: true,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 1,
                max_tokensMax: 8192,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 500
            }
        },
        "claude-3-5-haiku-latest": {
            id: "claude-3-5-haiku-latest",
            provider: "Anthropic",
            providerId: "anthropic",
            name: "Claude 3.5 Haiku",
            multiModal: false,
            Systemprompt: "",
            opt_max: {
                temperatureMax: 1,
                max_tokensMax: 8192,
                presence_penaltyMax: 2,
                frequency_penaltyMax: 2,
                top_pMax: 1,
                top_kMax: 500
            }
        }
    },
    DEFAULT_HEADERS: {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://fragments.e2b.dev/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    MODEL_PROMPT: "Chatting with users and starting role-playing, the most important thing is to pay attention to their latest messages, use only 'text' to output the chat text reply content generated for user messages, and finally output it in code"
};

// 工具类
class Utils {
    static uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static async configOpt(params: Record<string, any>, modelConfig: any): Promise<Record<string, any> | null> {
        if (!modelConfig.opt_max) return null;

        const optionsMap = {
            temperature: 'temperatureMax',
            max_tokens: 'max_tokensMax',
            presence_penalty: 'presence_penaltyMax',
            frequency_penalty: 'frequency_penaltyMax',
            top_p: 'top_pMax',
            top_k: 'top_kMax'
        };

        const constrainedParams = Object.fromEntries(
            Object.entries(params)
                .filter(([key, value]) => {
                    const maxKey = optionsMap[key as keyof typeof optionsMap];
                    return maxKey &&
                        modelConfig.opt_max[maxKey] &&
                        value !== null &&
                        value !== undefined;
                })
                .map(([key, value]) => {
                    const maxKey = optionsMap[key as keyof typeof optionsMap];
                    return [key, Math.min(value as number, modelConfig.opt_max[maxKey])];
                })
        );

        return constrainedParams;
    }
}

// API客户端类
class ApiClient {
    private modelConfig: any;

    constructor(modelId: string) {
        if (!CONFIG.MODEL_CONFIG[modelId]) {
            throw new Error(`不支持的模型: ${modelId}`);
        }
        this.modelConfig = CONFIG.MODEL_CONFIG[modelId];
    }

    processMessageContent(content: any): string | null {
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) {
            return content
                .filter(item => item.type === 'text')
                .map(item => item.text)
                .join('\n');
        }

        if (typeof content === 'object') return content.text || null;
        return null;
    }

    async prepareChatRequest(request: any, config: any) {
        const optConfig = config || { model: this.modelConfig.id };
        return {
            userID: Utils.uuidv4(),
            messages: await this.transformMessages(request),
            template: {
                text: {
                    name: CONFIG.MODEL_PROMPT,
                    lib: [""],
                    file: "pages/ChatWithUsers.txt",
                    instructions: this.modelConfig.Systemprompt,
                    port: null
                }
            },
            model: {
                id: this.modelConfig.id,
                provider: this.modelConfig.provider,
                providerId: this.modelConfig.providerId,
                name: this.modelConfig.name,
                multiModal: this.modelConfig.multiModal
            },
            config: optConfig
        };
    }

    async transformMessages(request: any) {
        const mergedMessages = request.messages.reduce((acc: any[], current: any) => {
            const lastMessage = acc[acc.length - 1];
            const currentContent = this.processMessageContent(current.content);

            if (currentContent === null) return acc;

            if (lastMessage && current && (lastMessage.role == current.role)) {
                const lastContent = this.processMessageContent(lastMessage.content);
                if (lastContent !== null) {
                    lastMessage.content = `${lastContent}\n${currentContent}`;
                    return acc;
                }
            }
            acc.push(current);
            return acc;
        }, []);

        return mergedMessages.map((msg: any) => {
            switch (msg.role) {
                case "system":
                case "user":
                    return {
                        role: "user",
                        content: [{
                            type: "text",
                            text: msg.content
                        }]
                    };
                case "assistant":
                    return {
                        role: "assistant",
                        content: [{
                            type: "text",
                            text: msg.content
                        }]
                    };
                default:
                    return msg;
            }
        });
    }
}

// 响应处理类
class ResponseHandler {
    static async handleStreamResponse(chat_message: string, model: string): Promise<Response> {
        let index = 0;
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const sendChunk = () => {
                        if (index >= chat_message.length) {
                            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                            controller.close();
                            return;
                        }

                        const chunkSize = Math.floor(Math.random() * (30 - 16)) + 15;
                        const chunk = chat_message.slice(index, index + chunkSize);

                        const eventData = {
                            id: Utils.uuidv4(),
                            object: 'chat.completion.chunk',
                            created: Math.floor(Date.now() / 1000),
                            model: model,
                            choices: [{
                                index: 0,
                                delta: { content: chunk },
                                finish_reason: index + chunkSize >= chat_message.length ? 'stop' : null
                            }]
                        };

                        try {
                            const payload = `data: ${JSON.stringify(eventData)}\n\n`;
                            controller.enqueue(encoder.encode(payload));
                        } catch (error) {
                            throw new Error('json转换失败');
                        }

                        index += chunkSize;
                        setTimeout(sendChunk, 50);
                    };

                    sendChunk();
                } catch (error) {
                    throw new Error('Error in handleStreamResponse');
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            }
        });
    }

    static async handleNormalResponse(chat_message: string, model: string): Promise<Response> {
        const responseData = {
            id: Utils.uuidv4(),
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model: model,
            choices: [{
                index: 0,
                message: {
                    role: "assistant",
                    content: chat_message
                },
                finish_reason: "stop"
            }],
            usage: null
        };

        return new Response(JSON.stringify(responseData), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Deno 服务处理
Deno.serve(async (request: Request): Promise<Response> => {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        });
    }

    const url = new URL(request.url);

    // Models endpoint
    if (url.pathname === '/hf/v1/models' && request.method === 'GET') {
        return new Response(JSON.stringify({
            object: "list",
            data: Object.keys(CONFIG.MODEL_CONFIG).map((model) => ({
                id: model,
                object: "model",
                created: Math.floor(Date.now() / 1000),
                owned_by: "e2b",
            })),
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    // Chat completions endpoint
    if (url.pathname === '/hf/v1/chat/completions' && request.method === 'POST') {
        try {
            const authToken = request.headers.get('authorization')?.replace('Bearer ', '');
            if (authToken !== CONFIG.API.API_KEY) {
                return new Response(JSON.stringify({ error: "Unauthorized" }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const requestBody = await request.json();
            const {
                model,
                temperature,
                max_tokens,
                presence_penalty,
                frequency_penalty,
                top_p,
                top_k,
                stream
            } = requestBody;

            const configOpt = await Utils.configOpt({
                temperature,
                max_tokens,
                presence_penalty,
                frequency_penalty,
                top_p,
                top_k
            }, CONFIG.MODEL_CONFIG[model]);

            const apiClient = new ApiClient(model);
            const requestPayload = await apiClient.prepareChatRequest(requestBody, configOpt);

            const fetchResponse = await fetch(`${CONFIG.API.BASE_URL}/api/chat`, {
                method: "POST",
                headers: CONFIG.DEFAULT_HEADERS,
                body: JSON.stringify(requestPayload)
            });

            const responseData = await fetchResponse.json();
            const chat_message = responseData?.code?.trim() ??
                responseData?.text?.trim() ??
                responseData?.trim() ??
                null;

            if (!chat_message) {
                throw new Error('No response from upstream service');
            }

            return stream
                ? await ResponseHandler.handleStreamResponse(chat_message, model)
                : await ResponseHandler.handleNormalResponse(chat_message, model);

        } catch (error) {
            return new Response(JSON.stringify({
                error: {
                    message: `${error.message} 请求失败，可能是上下文超出限制或其他错误，请稍后重试。`,
                    type: 'server_error',
                    param: null,
                    code: null
                }
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }

    // 404 处理
    return new Response('服务运行成功，请使用正确请求路径', {
        status: 404,
        headers: { 'Access-Control-Allow-Origin': '*' }
    });
});
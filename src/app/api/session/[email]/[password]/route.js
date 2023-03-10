const jwt = require("jsonwebtoken");
export async function GET(req_, res_) {
    const { email, password } = res_.params;

    if (true) {
        const token = jwt.sign({ id: 1 }, "firma");
        return Response.json({
            estado: true,
            token
        })
    }
    else {
        return Response.json({
            estado: false,
        });
    }
}

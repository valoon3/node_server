const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({ // static.init static.associate 메서드로 나눈다.
            // init(테이블 컬럼 설정, 테이블 자체에 대한 설정)
            // sequelize는 알아서 id를 기본 키로 연결한다.
            // ===자료형 변환===
            // varchar => string
            // int => integer
            // TINYINT => BOOLEAN
            // DATETIME => DATE
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            // static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야한다. model/index.js 에서 연결
            timestamps: false,
            // 현재 false로 되어있으며, 이 속성 값이 true면 시퀄라이즈는 createdAt, updatedAt 컬럼을 추가한다.
            // 하지만 예제에서는 직접 created_at 컬럼을 만들었으므로 timestamps 속성이 필요하지 않다.
            // 따라서 속성값을 false로 하여 자동으로 날짜 컬럼을 추가하는 기능을 해제
            underscored: false,
            // 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 캐멀케이스로 바꾼다. 이걸 스네이크 케이스로 바꾼다.
            modelName: 'User',
            // 모델 이름을 설정할 수 있다. 노드 프로젝트에서 사용한다.
            tableName: 'user',
            // 실제 데이터베이스의 테이블 이름이 된다.
            // 기본적으로는 모델 이름을 소문자 및 복수형으로 만든다,
            // 모델 이름이 User라면 테이블 이름은 user가 된다.
            paranoid: false,
            // true로 설정하면 deletedAt 이라는 컬럼이 생긴다. 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록된다.
            // 로우를 조회하는 명령을 내렸을 때는 deletedAt의 값이 null인 로우(삭제되지 않았다는 뜻)를 조회합니다.
            // 이렇게 하는 이유는 나중에 로우를 복원하기 위해서입니다.
            // 로우를 복원해야 하는 상황이 생길 것 같다면 미리 true로 설정해두자.
            charset: 'utf8',
            collate: 'utf8_general_ci',
            // utf8mb와 utf8mb4_general_ci를 입력하면 이모티콘까지 입력가능하다.
        });
    }
    static associate(db) {}
}
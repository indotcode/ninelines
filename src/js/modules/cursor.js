import helpers from '../helpers';

const init = () => {
    const duration = 1000;
    let jsCursor = $('.js-cursor');
    let jsCursorSkills = $('.js-cursor_skills');
    let jsCursorNumber = $('.js-cursor_number');
    let skills = helpers.$window[0].data.skills;
    let max = skills.reduce((s, i) => s = s + i.number, 0);
    let inter = 180 / max;
    let num = skills.reduce((s, i) => s = s + (i.active ? i.number : 0), 0)
    let rotate = num * inter;

    jsCursor.css('transform', 'rotate(' + rotate + 'deg)')
    jsCursorNumber.html(num);

    jsCursorSkills.each((i, item) => {

        item.addEventListener('input', (event) => {

            skills[event.target.id].active = event.target.checked
            let prevNum = num;
            num = skills.reduce((s, i) => s = s + (i.active ? i.number : 0), 0);
            rotate = num * inter;

            jsCursor.css('transform', 'rotate(' + rotate + 'deg)')

            $({ numberValue: prevNum }).animate({ numberValue: num }, {
                duration: duration,
                easing: "linear",
                step: function(val) {
                    jsCursorNumber.html(Math.round(val));
                }
            });

        })
    })
}

export default {
    init
};
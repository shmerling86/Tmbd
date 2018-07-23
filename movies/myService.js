app.service('timeService', function () {
    function timeConvertor(length) {
        var con = Math.floor((length / 60));//שעות
        var con2 = length - (con * 60);//דקות

        var res = con + "h" + " " + con2 + "m";
        return res
    }
    return {
        convertor: timeConvertor
    }
});

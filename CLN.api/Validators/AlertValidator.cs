using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CLN.model.APIModels;
using FluentValidation;

namespace CLN.api.Validators
{
    public class AlertValidator : AbstractValidator<AlertDto>
    {
        public AlertValidator()
        {
            RuleFor(a => a.nombre)
              .NotEmpty().WithMessage("El Nombre no puede estar vacio")
              .Length(1, 100).WithMessage("El nombre debe tener mínimo 1 letra y máximo de 100 letras")
              .MaximumLength(100).WithMessage("El Nombre puede tener maximo 100 caracteres");
        }
    }
}
